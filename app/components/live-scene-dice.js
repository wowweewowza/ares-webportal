import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  diceString: '',
  showRollDice: false,
  
  gameApi: service(),
  flashMessages: service(),

  @action
  rollDice() {
    let api = this.gameApi;
    let dice = this.diceString;
    this.set('showRollDice', false);
    this.set('diceString', '');
          
    if (!dice) {
      this.flashMessages.danger("You haven't specified what dice to roll.");
      return;
    }

    api.requestOne('rollDice', { id: this.get('scene.id'), dice_string: dice }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
    });
  },
  
  @action
  setShowRollDice(value) {
    this.set('showRollDice', value);
  }
});