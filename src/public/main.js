Vue.createApp({
    data() {
        return {
            scores: {
                leftScore: '000',
                rightScore: '000',
                topScore: 'STP',
            },
            familiada: [],
            activeAnswers: [],
            xs: 0,
            sounds: {
                "correct": null,
                "wrong": null,
            }
        }
    },

    async created() {
        // Simple GET request using fetch
        let familiadaJson = await fetch("familiada.json")
        this.familiada = await familiadaJson.json()
        this.activeAnswers = this.familiada[0].answears

        this.sounds.correct = new Audio('assets/sounds/poprawna-odpowiedz.mp3')
        this.sounds.wrong   = new Audio('assets/sounds/bledna.mp3')
        this.sounds.intro   = new Audio('assets/sounds/intro.mp3')
        this.sounds.afterFirstFinal = new Audio('assets/sounds/po-1-rundzie-finalu.mp3')
        this.sounds.beforeAndAfter  = new Audio('assets/sounds/przed-i-po-rundzie.mp3')
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
                elem.addEventListener('click', (e) => {
                    
                    if (this.activeAnswers[idx].display) {
                        this.activeAnswers[idx].display = false;
                    } else {
                        this.activeAnswers[idx].display = true
                        this.sounds.correct.currentTime = 0
                        this.sounds.correct.play()
                    }
                })
            })
            
            // grafika X na złą odp + dźwięk
            // sound B - intro,
            // sound N - przed i po rundzie
            // sound M - po 1 rundzie finału
            document.addEventListener('keydown', (e) => {
                const key = e.key.toLowerCase()
                if (key == 'x') {
                    if (this.xs < 3) this.xs ++
                    this.sounds.wrong.currentTime = 0
                    this.sounds.wrong.play()
                }
                if (key == 'z') {
                    if (this.xs > 0) this.xs --
                }
                if (key == 'b') {
                    this.toggleAudio(this.sounds.intro)
                }
                if (key == 'n') {
                    this.toggleAudio(this.sounds.afterFirstFinal)
                }
                if (key == 'm') {
                    this.toggleAudio(this.sounds.beforeAndAfter)
                }
            });
            
        },
        toggleAudio(audio) {
            console.log(audio)
            if (audio.paused) {
                audio.play()
            } else {
                audio.pause()
                audio.currentTime = 0
            }    
        },
    },

    computed: {
    }


}).mount("#app")
