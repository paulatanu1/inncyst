import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-admin-privacy-policy',
  templateUrl: './admin-privacy-policy.component.html',
  styleUrls: ['./admin-privacy-policy.component.scss'],
})
export class AdminPrivacyPolicyComponent implements OnInit, OnDestroy {
  doc = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: {
          align: null,
        },
        content: [
          {
            type: 'text',
            text: 'hgjhhgh ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'strong',
              },
            ],
            text: 'bkhkjhg',
          },
        ],
      },
    ],
  };
  editor!: Editor;
  html = this.doc;

  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
  constructor() {}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  getHtmlContent(): void {
    console.log(this.html); // This will log the current content of the editor
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
