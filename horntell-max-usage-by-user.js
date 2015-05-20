maxSegment = 0;
maxProfiles = 0;
maxCampaigns = 0;
maxHornlets = 0;
maxMailets = 0;
maxActivity = 0;
maxSegmentUser = null;
maxProfilesUser = null;
maxCampaignsUser = null;
maxHornletsUser = null;
maxMailetsUser = null;
maxActivityUser = null;

db.users.find().forEach(function(user) {
	maxSegmentForUser = 0;
	maxProfilesForUser = 0;
	maxCampaignsForUser = 0;
	maxHornletsForUser = 0;
	maxMailetsForUser = 0;
	maxActivityForUser = 0;
	db.apps.find({user_id: user._id}).forEach(function(app) {
		maxSegmentForUser += db.segments.count({app_id: app._id});
		maxProfilesForUser += db.profiles.count({app_id: app._id});
		maxCampaignsForUser += db.campaigns.count({app_id: app._id});
		maxHornletsForUser += db.hornlets.count({app_id: app._id});
		maxMailetsForUser += db.mailets.count({app_id: app._id});
		maxActivityForUser += db.profileActivities.count({app_id: app._id});
	});
	if(maxSegment < maxSegmentForUser)
	{
		maxSegment = maxSegmentForUser;
		maxSegmentUser = user._id;
	}
	if(maxProfiles < maxProfilesForUser)
	{
		maxProfiles = maxProfilesForUser;
		maxProfilesUser = user._id;
	}
	if(maxCampaigns < maxCampaignsForUser)
	{
		maxCampaigns = maxCampaignsForUser;
		maxCampaignsUser = user._id;
	}
	if(maxHornlets < maxHornletsForUser)
	{
		maxHornlets = maxHornletsForUser;
		maxHornletsUser = user._id;
	}
	if(maxMailets < maxMailetsForUser)
	{
		maxMailets = maxMailetsForUser;
		maxMailetsUser = user._id;
	}
	if(maxActivity < maxActivityForUser)
	{
		maxActivity = maxActivityForUser;
		maxActivityUser = user._id;
	}
});

print("max Segment : "+maxSegment.toString() + '(' + maxSegmentUser + ')');
print("max activity : "+maxActivity.toString() + '(' + maxActivityUser + ')');
print("max mailets : "+maxMailets.toString() + '(' + maxMailetsUser + ')');
print("max Hornlets : "+maxHornlets.toString() + '(' + maxHornletsUser + ')');
print("max Campaigns : "+maxCampaigns.toString() + '(' + maxCampaignsUser + ')');
print("max profiles : "+maxProfiles.toString() + '(' + maxProfilesUser + ')');