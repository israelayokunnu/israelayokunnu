class TextScrambleClass {
  chars: string;
  updateText: (text: string) => void;
  frameRequest: number | null = null;

  constructor(chars: string, updateText: (text: string) => void) {
    this.chars = chars;
    this.updateText = updateText;
  }

  scramble(finalText: string) {
    let currentText = Array(finalText.length).fill('');
    let completed = Array(finalText.length).fill(false);
    const update = (frame: number) => {
      for (let i = 0; i < finalText.length; i++) {
        if (!completed[i]) {
          if (frame > i * 10 + 30) {
            completed[i] = true;
            currentText[i] = finalText[i];
          } else {
            currentText[i] = this.randomChar();
          }
        }
      }

      this.updateText(currentText.join(''));

      if (!completed.every(Boolean)) {
        this.frameRequest = requestAnimationFrame(update);
      }
    };

    this.frameRequest = requestAnimationFrame(update);
  }

  cancel() {
    if (this.frameRequest !== null) {
      cancelAnimationFrame(this.frameRequest);
    }
  }

  randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

export default TextScrambleClass;
