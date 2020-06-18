const fs = require('fs-extra');
const got = require('got');

module.exports = async (req, res, next) => {

	if (req.body.image !== undefined) {
		const ext = (req.body.image.src.split(';base64,'))[0].split('/').pop();
		const image = req.body.image.src.split(';base64,').pop();
		const dateNow = Date.now();
		const name = dateNow + '_' + req.body.image.name.toLowerCase().split(' ').join('-');
		const imagePath = 'images/user/' + name + '.' + ext;
		try {
			await fs.writeFile(imagePath, image, { encoding: 'base64' });
			console.log('oui');
		} catch (error) {
			console.log(error);
		}
		req.body.image.src = name + '.' + ext;
		next();
	}

	// add avatar by default
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
		console.log(error);
		return res.status(500).json({
			res: error
		});
	}

	const image = response.toString('base64');
	const dateNow = Date.now();
	const imagePath = dateNow + '_default_' + req.body.lastname.toLowerCase() + req.body.firstname.toLowerCase() + '.png'; // à voir
	try {
		await fs.writeFile(imagePath, image, { encoding: 'base64' });
		console.log('success');
	} catch (error) {
		console.log(error);
		res.status(500).json({
			e: error
		});
	}

	req.body.image.src = imagePath;
	// replace by next();
	return res.status(201).json({
		res: image
	});
}