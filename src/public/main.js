Vue.createApp({
    data() {
        return {
            scores: {
                leftScore: 123,
                rightScore: 789,
                topScore: 456,
            },
            familiada: [],
            activeAnswers: [],
            xs: 0,
        }
    },

    async created() {
        // Simple GET request using fetch
        let familiadaJson = await fetch("familiada.json")
        this.familiada = await familiadaJson.json()
        this.activeAnswers = this.familiada[0].answears
        this.registerKeyHandlers()
    },

    methods: {
        loadAnswersForQuestion(questionIndex) {
            let question = this.familiada[questionIndex]
            this.activeAnswers = question.answears.map(ans => {
                return {
                    ...ans,
                    display: false,
                }
            })
        },
        registerKeyHandlers() {
            window.addEventListener('keydown', (e) => {
                if (['1', '2', '3', '4', '5'].includes(e.key)) {
                    let key = Number(e.key)
                    this.activeAnswers[key - 1].display = !this.activeAnswers[key - 1].display
                    this.showOffScores()
                }
            });

            window.addEventListener('keydown', (e) => {
                if (e.key.toLowerCase() == 'x') {
                    if (this.xs < 3) this.xs ++
                }
                if (e.key.toLowerCase() == 'z') {
                    if (this.xs > 0) this.xs --
                }
            });

        },
        async showOffScores() {
            let rand = (low, high) => Math.ceil(Math.random() * (high - low) + low)
            {
                if (Math.random() > .5) {
                    this.scores.topScore = rand(100, 900)
                }
                if (Math.random() > .5) {
                    this.scores.leftScore = rand(100, 900)
                }
                if (Math.random() > .5) {
                    this.scores.rightScore = rand(100, 900)
                }
            }
        }
    },

    computed: {
    }


}).mount("#app")
