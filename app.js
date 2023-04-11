const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logBattles: []
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                // A draw
                this.winner = 'draw';
                // alert('Draw!');
            } else if(value <= 0){
                // Player lost
                this.winner = 'monster';
                // alert('You lost!');
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                // A draw
                this.winner = 'draw';
                // alert('Draw!');
            } else if(value <= 0){
                // Monster lost
                this.winner = 'player';
                // alert('You won!');
            }
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
    },
    methods: {
        startNewGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        surrender(){
            this.winner = 'monster';
            this.logBattle('player', 'surrender', 0);
        },
        getRandomValue(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        },
        attackMonster(){
            const attackValue = this.getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.logBattle('player', 'attack', attackValue);
            this.currentRound++;
        },
        attackPlayer(){
            const attackValue = this.getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.logBattle('monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            const attackValue = this.getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.currentRound++;
            this.logBattle('player', 'special-attack', attackValue);
        },
        healPlayer(){
            const healValue = this.getRandomValue(8, 20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.logBattle('player', 'heal', healValue);
            // this.currentRound++;
        },
        logBattle(who, what, value){
            this.logBattles.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');