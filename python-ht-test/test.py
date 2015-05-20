import horntell

horntell.App().init('vU3i0zc8tB9n5MEURxEslxU0jiJCfXyH1ArNUR7o', 'z8SOCupNoMoA8jdjTTfVQZkbi1X4pMvHZTIq4wSV')
horntell.App().set_base('http://api.horntell.app')

try:
	profile = horntell.Profile().find('xveMhY1426272594')

	print profile.get_body()['data']['first_name']
except horntell.errors.NotFoundError, error:
	print error.message, error.code