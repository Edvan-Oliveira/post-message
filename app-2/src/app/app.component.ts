import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messageApp1: any

  ngOnInit(): void {
    window.addEventListener('message', (event) => {
      console.log("APP 2 Recebeu", event)
      if (event.origin != "http://127.0.0.1:4001") return
      this.messageApp1 = event.data
    });
  }

  send() {
    console.log("APP 2 Enviando...");
    this.sentByIframe()
    this.sentByWindow()
  }

  sentByIframe() {
    if (window.self != window.parent) {
      const payload = { text: '(Iframe) Mensagem enviada do APP 2', color: '#2afa4a' }
      window.parent?.postMessage(payload, 'http://127.0.0.1:4001');
    }
  }

  sentByWindow() {
    const payload = { text: '(Window) Mensagem enviada do APP 2', color: '#ffc933' }
    window.opener?.postMessage(payload, 'http://127.0.0.1:4001');
  }
}
