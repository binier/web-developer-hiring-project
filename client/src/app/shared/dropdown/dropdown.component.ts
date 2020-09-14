import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() isOpen = false;

  @HostListener('document:keydown.escape', ['$event'])
  onEscHandler() {
    this.close();
  }

  @HostListener('document:click')
  onClickHandler() {
    this.close();
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
