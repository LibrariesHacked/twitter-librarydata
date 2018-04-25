$(function () {

    var library_types = {
        'national-libraries': {
            'name': 'National Libraries'
        },
        'non-uk-libraries': {
            'name': 'Non-UK Libraries'
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

    $.each(Object.keys(library_types), function (i, key) {
        $('#sel-librarytype').append($('<option>', {
            value: library_types[key].name,
            text: library_types[key].name
        }));
    });

    twitterlibraries.loadLists(function () {
        var libtable = $('#tbl-twitter').DataTable(
            {
                processing: true,
                responsive: true,
                dom: 'Bfrtip',
                info: false,
                deferRender: true,
                data: twitterlibraries.lists,
                buttons: [
                    'copy', 'excel'
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
                    {
                        title: "Joined",
                        render: function (data, type, row) {
                            return moment(data, 'ddd MMM DD hh:mm:ss +0000 YYYY').format('Do MMMM YYYY');
                        }
                    },
                    {
                        title: "Description",
                        render: function (data, type, row) {
                            return twttr.txt.autoLink(twttr.txt.htmlEscape(data));
                        }
                    }
                ]
            });

        $('#sel-librarytype').on('change', function () {
            libtable.column(0).search(this.value).draw();
        });
    });
});