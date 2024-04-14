import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('iframe', { static: false }) iframe!: ElementRef
  app2Window!: Window | null

  messageApp2: any

  ngOnInit(): void {
    window.addEventListener('message', (event) => {
      console.log("APP 1 Recebeu", event)
      if (event.origin == "http://127.0.0.1:4002")
        this.messageApp2 = event.data
    });
  }

  openApp2() {
    this.app2Window = window.open("http://127.0.0.1:4002")
  }

  send() {
    console.log("APP 1 Enviando...");
    this.sendToIframe()
    this.sendToWindow()
  }

  sendToIframe() {
    const payload = { text: '(Iframe) Mensagem enviada do APP 1', color: '#2afa4a' }
    this.iframe.nativeElement.contentWindow.postMessage(payload, 'http://127.0.0.1:4002');
  }

  sendToWindow() {
    const payload = { text: '(Window) Mensagem enviada do APP 1', color: '#ffc933' }
    this.app2Window?.postMessage(payload, 'http://127.0.0.1:4002');
  }

}
