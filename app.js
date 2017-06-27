new Vue({
    el: "#vue-app",

    data: {
        mangas: [],
        pages: [],
        actualPage: {},
        actualChapter: 0,
        actualManga: {},
        showAskNextChapter: false,
        showMessageLastChapter: false,
    },

    methods: {
        nextPage: function () {
            // Dont add 1 because array start on 0
            if (this.actualPage.page == this.pages.length) {
                this.actualPage = {};
                if (this.actualChapter != this.actualManga.chapters) {
                    this.askForNextChapter();
                } else {
                    this.showMessageLastChapter = true;
                }
            } else {
                this.actualPage = this.pages[this.actualPage.page];
            }
        },

        askForNextChapter: function () {
            this.showAskNextChapter = true;
        },

        loadNextChapter: function () {
            this.$http.get('data/one-piece-'+ (++this.actualChapter) +'.json').then(response => {
                this.pages = response.body;
                this.actualPage = response.body[0];
                this.showAskNextChapter = false;
            });
        },
    },

    mounted: function () {
        this.$http.get('data/mangas.json').then(response => {
            this.mangas = response.body;
            this.actualManga = this.mangas[0];
        });

        // First chapter
        this.loadNextChapter();
    },

});
