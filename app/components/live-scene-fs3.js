import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  selectSpendLuck: false,
  selectSpendFocus: false,
  selectSkillRoll: false,
  selectResetFocus: false,
  luckReason: null,
  focusReason: null,
  focusAmount: null,
  tagName: '',
  gameApi: service(),
  flashMessages: service(),

  @action
  spendLuck() {
    let api = this.gameApi;
    let luckReason = this.luckReason;
    
    this.set('selectSpendLuck', false);
    this.set('luckReason', null);
          
    if (!luckReason) {
      this.flashMessages.danger("You haven't given a reason for your luck spend.");
      return;
    }

    api.requestOne('spendLuck', { scene_id: this.get('scene.id'),
    reason: luckReason, sender: this.get('scene.poseChar.name') }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
    });
  },

  @action
  spendFocus() {
    let api = this.gameApi;
    let focusReason = this.focusReason;
    
    this.set('selectSpendFocus', false);
    this.set('focusReason', null);
    this.set('focusAmount', null);
          
    if (!focusReason) {
      this.flashMessages.danger("You haven't given a reason for your focus spend.");
      return;
    }

    if (!focusAmount) {
      this.flashMessages.danger("You haven't given a reason for your focus spend.");
      return;
    }

    api.requestOne('spendFocus', { scene_id: this.get('scene.id'),
    reason: focusReason, amount: focusAmount, sender: this.get('scene.poseChar.name') }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
    });
  },

  @action
  resetFocus() {
    let api = this.gameApi;
    
    this.set('selectResetFocus', false);

    api.requestOne('resetFocus', { scene_id: this.get('scene.id'),
    sender: this.get('scene.poseChar.name') }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
    });
  },
    
  @action
  startCombat() {
    let api = this.gameApi;
    api.requestOne('startCombat', { scene_id: this.get('scene.id') }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.set('scene.combat', response);
    });
  },
  
  @action
  setSelectSkillRoll(value) {
    this.set('selectSkillRoll', value);
  },
  
  @action
  setSelectSpendLuck(value) {
    this.set('selectSpendLuck', value);
  },

  @action
  setSelectSpendFocus(value) {
    this.set('selectSpendFocus', value);
  },

  @action
  setSelectResetFocus(value) {
    this.set('selectResetFocus', value);
  }
});
