import { Component, ElementRef, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Pia} from 'app/entry/pia.model';

@Component({
  selector: 'app-dpo-people-opinions',
  templateUrl: './dpo-people-opinions.component.html',
  styleUrls: ['./dpo-people-opinions.component.scss']
})
export class DPOPeopleOpinionsComponent implements OnInit {

  @Input() pia: any;
  dpo_status_locker: boolean;
  DPOForm: FormGroup;
  peopleForm: FormGroup;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.pia.dpo_status === 0 || this.pia.dpo_status === 1) {
      this.dpo_status_locker = true;
    }
/*    if (this.pia.dpo_opinion) {
      this.DPOForm.value.DPOOpinion = pia.
    }*/
    /* TODO : lock field when PIA is validated */
    /*if (pia.status === 4) {
      this.peopleForm.disable();
    }*/

    this.DPOForm = new FormGroup({
      DPOStatus : new FormControl(),
      DPOOpinion: new FormControl({ value: this.pia.dpo_opinion })
    });
    console.log(this.pia.dpo_opinion);
    this.peopleForm = new FormGroup({
      peopleStatus : new FormControl(),
      peopleOpinion: new FormControl()
    });
  }

  /**
   * Disables DPO fields (status + opinion) and saves data.
   */
  DPOFocusOut() {
    if (this.DPOForm.value.DPOOpinion && this.DPOForm.value.DPOOpinion.length > 0 && this.DPOForm.controls['DPOStatus'].dirty) {
      this.DPOForm.disable();
      this.showDPOEditButton();
      const pia = new Pia();
      pia.id = this.pia.id;
      pia.get(pia.id).then(() => {
        pia.dpo_opinion = this.DPOForm.value.DPOOpinion;
        pia.dpo_status = parseInt(this.DPOForm.value.DPOStatus, 10);
        pia.update()
      });
    }
  }

  /**
   * Activates DPO fields (status + opinion).
   */
  activateDPOEdition() {
    this.hideDPOEditButton();
    this.DPOForm.enable();
  }

  /**
   * Shows DPO edit button.
   */
  showDPOEditButton() {
    const editBtn = this.el.nativeElement.querySelector('#piaDPOPencil');
    editBtn.classList.remove('hide');
  }

  /**
   * Hides DPO edit button.
   */
  hideDPOEditButton() {
    const editBtn = this.el.nativeElement.querySelector('#piaDPOPencil');
    editBtn.classList.add('hide');
  }

  /**
   * Disables people fields (status + opinion) and saves data.
   */
  peopleFocusOut() {
    if (this.peopleForm.value.peopleOpinion && this.peopleForm.value.peopleOpinion.length > 0 && this.peopleForm.controls['peopleStatus'].dirty) {
      this.peopleForm.disable();
      this.showPeopleEditButton();
    }
    // Saving data here
  }

  /**
   * Activates people fields (status + opinion).
   */
  activatePeopleEdition() {
    this.hidePeopleEditButton();
    this.peopleForm.enable();
  }

  /**
   * Shows people edit button.
   */
  showPeopleEditButton() {
    const editBtn = this.el.nativeElement.querySelector('#piaPeoplePencil');
    editBtn.classList.remove('hide');
  }

  /**
   * Hides people edit button.
   */
  hidePeopleEditButton() {
    const editBtn = this.el.nativeElement.querySelector('#piaPeoplePencil');
    editBtn.classList.add('hide');
  }
}