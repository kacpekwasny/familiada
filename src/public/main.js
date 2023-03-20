Vue.createApp({
    data() {
        return {
            scores: {
                leftScore: '000',
                rightScore: '000',
                topScore: '000',
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
    },
    async mounted() {
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
            let rows = document.getElementsByClassName('board-response-row')
            Array.prototype.forEach.call(rows, (elem, idx, arr) => {
                console.log(elem)
                elem.addEventListener('click', (e) => {
                    this.activeAnswers[idx].display = !this.activeAnswers[idx].display
                })
            })

            screen.addEventListener('keydown', (e) => {
                if (e.key.toLowerCase() == 'x') {
                    if (this.xs < 3) this.xs ++
                }
                if (e.key.toLowerCase() == 'z') {
                    if (this.xs > 0) this.xs --
                }
            });

        },
    },

    computed: {
    }


}).mount("#app")
