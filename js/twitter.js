var twitterlibraries = {
    lists: [],
    loadLists: function (callback) {
        $.getJSON('/data/sarahhlib_lists.json', function (data) {
            $.each(data, function (i, list) {
                $.each(list.members, function (y, member) {
                    this.lists.push(
                        [
                            list.listname,
                            member.name,
                            member.location,
                            member.following_count || 0,
                            member.followers_count || 0,
                            member.statuses_count || 0,
                            member.favourites_count || 0,
                            member.created_at,
                            member.description
                        ]
                    );
                }.bind(this));
            }.bind(this));
            callback();
        }.bind(this))
    }
};