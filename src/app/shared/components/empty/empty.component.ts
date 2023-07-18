import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() buttonLink: string;
  @Input() buttonText: string;
  @Input() cardBorders: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
