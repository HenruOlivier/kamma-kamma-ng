import { AfterViewInit, Directive, ElementRef, Input, SimpleChange } from '@angular/core';
import { ActionButtonStates } from './action-button-states';

@Directive({
    selector: '[actionButton]'
})
export class ActionButtonDirective implements AfterViewInit {

    private audioContext: AudioContext;

    @Input() state: ActionButtonStates = ActionButtonStates.Idle;

    @Input() text!: string;

    content = null;

    loading = `<div class="w-100" style="display:flex; justify-content: center"><div class="ss-loading-sm"></div></div>`
    error = `<div class="w-100" style="display:flex; justify-content: center"><i class="bi bi-exclamation-triangle ss-fs-5"></i></div>`
    success = `<div class="w-100" style="display:flex; justify-content: center"><i class="bi bi-check2 ss-fs-5"></i></div>`

    constructor(private elementRef: ElementRef) {
        this.audioContext = new (window.AudioContext || window.AudioContext)();
    }

    ngOnChanges(changes: { state: SimpleChange } | any) {
        if (changes.state) {
            this.state = changes.state.currentValue;
            this.updateButton();
        }
    }

    ngAfterViewInit(): void {
        this.content = this.elementRef.nativeElement.innerHTML;
        this.updateButton();
    }

    updateButton() {
        if (this.content !== null) {
            let innerHTML: string;

            if (this.state === ActionButtonStates.Loading) {
                innerHTML = this.loading;
                this.elementRef.nativeElement.disabled = true;
            } else if (this.state === ActionButtonStates.Error) {
                this.playSound('error.mp3');
                innerHTML = this.error;
                this.elementRef.nativeElement.disabled = false;
            } else if (this.state === ActionButtonStates.Success) {
                this.playSound('success.mp3');
                innerHTML = this.success;
                this.elementRef.nativeElement.disabled = false;
            } else {
                innerHTML = this.content;
            }
            if (this.text) {
                innerHTML = `<span>${innerHTML}</span><span class="ss-fs-xsm">${this.text}</span>`;
            }

            this.elementRef.nativeElement.innerHTML = innerHTML;
        }
    }

    playSound(fileName:string): void {
        const audioUrl = `assets/audio/${fileName}`;
        fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                const source = this.audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.audioContext.destination);
                source.start(0);
            })
            .catch(error => console.error('Error with fetching the audio file', error));
    }
}
