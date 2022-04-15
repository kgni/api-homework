fetch('http://dog-api.kinduff.com/api/facts')
	.then((res) => res.json())
	.then((data) => console.log(data))
	.catch((err) => console.log('something went wrong'));
