new Vue({
    el: "#vue-app",
    data: {
        current_handcuffs: 0,
        target_handcuffs: 150,
        remaining_reset_cycles: 7,
        readied_cases: 4,
        badges: 0,
        available_case_slots: 4,
    },
    computed: {
        remainingTries: function () {
            return this.remaining_reset_cycles * this.available_case_slots + parseInt(this.readied_cases) + parseInt(this.badges)
        },
        points: function () {
            return {
                blue: 1,
                purple: 3
            }
        },
        targetAmount: function () {
            return this.target_handcuffs - this.current_handcuffs || 0
        },
        result: function () {
            console.log(this.remainingTries)
            let blue = this.remainingTries,
                purple = 0,
                points = blue * this.points.blue

            if (points > this.targetAmount) {
                while (points > this.targetAmount) {
                    blue--
                    points = blue * this.points.blue
                }

                blue++
                points = blue * this.points.blue
            }

            while(points <= this.targetAmount && blue > 0) {
                blue --
                purple ++
                points = blue * this.points.blue + purple * this.points.purple
            }

            console.log(this.targetAmount)
            console.log(points)

            if (this.targetAmount <= 0) {
                return 'Please fill the fields so I can calculte the cases you need to complete to achieve your goal.'
            }

            if (points >= this.targetAmount) {
                return `You will need to complete at least <span style="color: mediumblue;">${blue} blue case(s)</span> and <span style="color: purple;">${purple} purple case(s)</span>`
            }

            if (points < this.targetAmount) {
                return `<span class="text-danger">Your goal is not attainable with your current resources</span>`
            }
        }
    },
    methods: {

    }
});
