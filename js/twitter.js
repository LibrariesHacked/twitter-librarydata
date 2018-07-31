var twitterlibraries = {
    lists: [],
    hashtags: {},
    mentions: {},
    month_counts: {},
    loadLists: function (callback) {
        $.getJSON('/data/sarahhlib_librarylists.json', function (data) {
            $.each(data, function (i, list) {
                $.each(list.members, function (y, member) {
                    this.lists.push(
                        [
                            list.listname,
                            member.name,
                            member.location,
                            member.friends_count || 0,
                            member.followers_count || 0,
                            member.statuses_count || 0,
                            member.favourites_count || 0,
                            member.created_at,
                            member.description,
                            member.status_created_at,
                            member.status_text
                        ]
                    );
                    var joined = moment(member.created_at, 'ddd MMM DD hh:mm:ss +0000 YYYY').format('YYYYMM');
                    if (!this.hashtags[list.listname]) this.hashtags[list.listname] = [];
                    if (!this.mentions[list.listname]) this.mentions[list.listname] = [];
                    if (!this.month_counts[list.listname]) this.month_counts[list.listname] = {};
                    if (!this.month_counts[list.listname][joined]) this.month_counts[list.listname][joined] = 0;
                    this.month_counts[list.listname][joined] = this.month_counts[list.listname][joined] + 1;
                    this.hashtags[list.listname] = this.hashtags[list.listname].concat(twttr.txt.extractHashtags(member.status_text));
                    this.mentions[list.listname] = this.mentions[list.listname].concat(twttr.txt.extractMentions(member.status_text));
                }.bind(this));
            }.bind(this));
            callback();
        }.bind(this))
    }
};