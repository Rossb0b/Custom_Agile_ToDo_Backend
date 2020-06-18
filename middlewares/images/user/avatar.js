const fs = require('fs-extra');
const got = require('got');

module.exports = async (req, res, next) => {

	// add user image
	if (req.body.image !== undefined) {
		const ext = (req.body.image.src.split(';base64,'))[0].split('/').pop();
		if (ext.toLowerCase() !== ('png' || 'jpg' || 'jpeg')) {
			return res.status(400).json({
				message: 'Invalid image format',
				ext: ext
			});
		}
		const image = req.body.image.src.split(';base64,').pop();
		const dateNow = Date.now();
		const name = dateNow + '_' + req.body.image.name.toLowerCase().split(' ').join('-');
		const imagePath = 'images/user/' + name;
		try {
			await fs.writeFile(imagePath, image, { encoding: 'base64' });
		} catch (error) {
			return res.status(500).json({
				message: 'Save image failed',
				e: error
			});
		}
		req.body.image = name;
		next();
	}

	// else add avatar by default
	let response;
	try {
		response = await got(
			'https://eu.ui-avatars.com/api/',
			{
				searchParams: { name: req.body.lastname + ' ' + req.body.firstname },
				resolveBodyOnly: true
			}
		).buffer();
	} catch (error) {
		return res.status(500).json({
			res: error
		});
	}

	const image = response.toString('base64');
	const dateNow = Date.now();
	const name = dateNow + '_default_' + req.body.lastname.toLowerCase() + req.body.firstname.toLowerCase() + '.png';
	const imagePath = 'images/user/' + name;
	try {
		await fs.writeFile(imagePath, image, { encoding: 'base64' });
	} catch (error) {
		res.status(500).json({
			message: 'Save image failed',
			e: error
		});
	}

	req.body = {
		...req.body,
		image: name
	};

	next();
}