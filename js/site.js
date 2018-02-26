$(function () {

    var library_types = {
        'national-libraries': {
            'name': 'National Libraries'
        },
        'non-uk-libraries': {
            'name': 'Non-UK Libraries'
        },
        'ox-cam-libraries': {
            'name': 'Oxford and Cambridge Libraries'
        },
        'uk-public-libraries': {
            'name': 'UK Public Libraries'
        },
        'uk-academic-libraries': {
            'name': 'UK Academic Libraries'
        },
        'uk-med-libraries': {
            'name': 'UK Medical Libraries'
        },
        'other-libraries-uk': {
            'name': 'Other UK Libraries'
        },
        'uk-sch-fe-lib': {
            'name': 'UK School and FE Libraries'
        }
    };

    twitterlibraries.loadLists(function () {
        $('#tbl-twitter').dataTable(
            {
                processing: true,
                responsive: true,
                dom: 'Bfrtip',
                info: false,
                deferRender: true,
                data: twitterlibraries.lists,
                buttons: [
                    'copy', 'print', 'excel', 'pdf'
                ],
                columns: [
                    {
                        title: "Type",
                        render: function (data, type, row) {
                            return library_types[data].name;
                        }
                    },
                    { title: "Name" },
                    { title: "Location" },
                    { title: "Following" },
                    { title: "Followers" },
                    { title: "Tweets" },
                    { title: "Likes" },
                    { title: "Joined" },
                    { title: "Description" }
                ]
            });
    });
});