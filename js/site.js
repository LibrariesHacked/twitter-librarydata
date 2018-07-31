$(function () {

    var library_types = {
        'uk-libraries': {
            'name': 'UK Libraries'
        },
        'non-uk-libraries': {
            'name': 'Non-UK Libraries'
        },
        'uk-sch-fe-lib': {
            'name': 'UK School and FE Libraries'
        },
        'other-libraries-uk': {
            'name': 'Other UK Libraries'
        },
        'national-libraries': {
            'name': 'National Libraries'
        },
        'uk-public-libraries': {
            'name': 'UK Public Libraries'
        },
        'uk-academic-libraries': {
            'name': 'UK Academic Libraries'
        },
        'uk-med-libraries': {
            'name': 'UK Medical Libraries'
        }
    };

    var background_colours = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
    ];

    var border_colours = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
    ];

    twitterlibraries.loadLists(function () {
        // Set up hashtags bar chart
        var ctx_bar_hashtags = document.getElementById('cht_hashtags').getContext('2d');
        var bar_hashtags = new Chart(ctx_bar_hashtags, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        background_colours[0],
                        background_colours[1],
                        background_colours[2],
                        background_colours[3],
                        background_colours[4]
                    ],
                    borderColor: [
                        border_colours[0],
                        border_colours[1],
                        border_colours[2],
                        border_colours[3],
                        border_colours[4]
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Trending Hashtags'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            callback: function (value) {
                                if (value.length > 7) {
                                    return value.substr(0, 7) + '...';
                                } else {
                                    return value
                                }

                            }
                        }

                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'label',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            var idx = tooltipItems[0].index;
                            return data.labels[idx];
                        },
                        label: function (tooltipItems, data) {
                            var idx = tooltipItems.index;
                            return data.datasets[0].data[idx];
                        }
                    }
                }
            }
        });

        // Set up mentions bar chart
        var ctx_bar_mentions = document.getElementById('cht_mentions').getContext('2d');
        var bar_mentions = new Chart(ctx_bar_mentions, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        background_colours[0],
                        background_colours[1],
                        background_colours[2],
                        background_colours[3],
                        background_colours[4]
                    ],
                    borderColor: [
                        border_colours[0],
                        border_colours[1],
                        border_colours[2],
                        border_colours[3],
                        border_colours[4]
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Trending Mentions'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            callback: function (value) {
                                if (value.length > 7) {
                                    return value.substr(0, 7) + '...';
                                } else {
                                    return value
                                }

                            }
                        }

                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'label',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            var idx = tooltipItems[0].index;
                            return data.labels[idx];
                        },
                        label: function (tooltipItems, data) {
                            var idx = tooltipItems.index;
                            return data.datasets[0].data[idx];
                        }
                    }
                }
            }
        });

        // Set up monthly line chart
        var ctx_line_joined = document.getElementById('cht_joined').getContext('2d');
        var line_joined = new Chart(ctx_line_joined, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Twitter Signup'
                },
                legend: {
                    display: false
                }
            }
        });

        var setHashtags = function (list) {
            var hashtags = {};
            for (var i = 0; i < twitterlibraries.hashtags[list].length; i++) {
                if (!hashtags[twitterlibraries.hashtags[list][i]]) hashtags[twitterlibraries.hashtags[list][i]] = 0;
                hashtags[twitterlibraries.hashtags[list][i]] = hashtags[twitterlibraries.hashtags[list][i]] + 1;
            }
            var top_five = Object.keys(hashtags).sort(function (a, b) { return (hashtags[b] - hashtags[a]) }).slice(0, 5);
            bar_hashtags.data.labels = [];
            bar_hashtags.data.datasets[0].data = [];
            $.each(top_five, function (i, hashtag) {
                bar_hashtags.data.labels.push(hashtag);
                bar_hashtags.data.datasets[0].data.push(hashtags[hashtag]);
            });
            bar_hashtags.update();
        };

        var setMentions = function (list) {
            var mentions = {};
            for (var y = 0; y < twitterlibraries.mentions[list].length; y++) {
                if (!mentions[twitterlibraries.mentions[list][y]]) mentions[twitterlibraries.mentions[list][y]] = 0;
                mentions[twitterlibraries.mentions[list][y]] = mentions[twitterlibraries.mentions[list][y]] + 1;
            }
            var top_five = Object.keys(mentions).sort(function (a, b) { return (mentions[b] - mentions[a]) }).slice(0, 5);
            bar_mentions.data.labels = [];
            bar_mentions.data.datasets[0].data = [];
            $.each(top_five, function (i, mention) {
                bar_mentions.data.labels.push(mention);
                bar_mentions.data.datasets[0].data.push(mentions[mention]);
            });
            bar_mentions.update();
        };

        var setJoined = function (list) {
            line_joined.data.datasets = [];

            line_joined.data.labels = $.map(Object.keys(twitterlibraries.month_counts[list]), function (d, i) {
                return moment(d, 'YYYYMM').format('MMM YY')
            });
            line_joined.data.datasets.push({
                backgroundColor: [background_colours[1]],
                borderColor: [border_colours[1]],
                borderWidth: 1,
                label: '',
                data: Object.keys(twitterlibraries.month_counts[list]).map(function (mth, y) {
                    return twitterlibraries.month_counts[list][mth];
                }),
                pointRadius: 0
            });
            line_joined.update();
        };
        
        jQuery.fn.dataTableExt.oSort["customdate-desc"] = function (x, y) {
            return moment(x).isAfter(moment(y));
        };
        jQuery.fn.dataTableExt.oSort["customdate-asc"] = function (x, y) {
            return moment(x).isAfter(moment(y));
        }

        var libtable = $('#tbl-twitter').DataTable(
            {
                processing: true,
                responsive: true,
                dom: 'Bfrtip',
                info: false,
                deferRender: true,
                data: twitterlibraries.lists,
                buttons: ['copy', 'excel', 'pdf'],
                columns: [
                    {
                        title: "Type",
                        render: function (data, type, row) {
                            return data;
                        },
                        visible: false,
                    },
                    { title: "Name" },
                    { title: "Location" },
                    { title: "Following" },
                    { title: "Followers" },
                    { title: "Tweets" },
                    { title: "Likes" },
                    {
                        title: "Joined",
                        sType: "customdate",
                        render: function (data, type, row) {
                            return moment(data, 'ddd MMM DD hh:mm:ss +0000 YYYY').format('Do MMMM YYYY');
                        }
                    },
                    {
                        title: "Description",
                        render: function (data, type, row) {
                            return twttr.txt.autoLink(twttr.txt.htmlEscape(data));
                        }
                    },
                    {
                        title: "Last tweeted",
                        sType: "customdate",
                        render: function (data, type, row) {
                            return moment(data, 'ddd MMM DD hh:mm:ss +0000 YYYY').format('Do MMMM YYYY');
                        }
                    },
                    {
                        title: "Last tweet",
                        render: function (data, type, row) {
                            return twttr.txt.autoLink(twttr.txt.htmlEscape(data));
                        }
                    }
                ]
            });
            
        libtable.on('init', function () {
            $('#div_loading').hide();
        } );

        var setList = function (listname) {
            libtable.column(0).search('^' + listname + '$', true, false).draw();
        }

        $.each(Object.keys(library_types), function (i, key) {
            if (i === 0) {
                setList(key);
                setHashtags(key);
                setMentions(key);
                setJoined(key);
            }
            $('#sel-librarytype').append($('<option>', {
                value: key,
                text: library_types[key].name
            }));
        });

        $('#sel-librarytype').on('change', function () {
            // Update the table
            setList(this.value);
            setHashtags(this.value);
            setMentions(this.value);
            setJoined(this.value);
            
        });
    });
});