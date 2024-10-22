class SpriteManager {
    constructor(spriteSheet, horizontalFrames, verticalFrames) {
    this.spriteSheet = spriteSheet;
    this.horizontalFrames = horizontalFrames;
    this.verticalFrames = verticalFrames;
    }
    selectSprite(character, direction) {
    switch (direction) {
    case 'up':
    character.sprite.horizontalFrameIndex = character.frames.up.horizontal[0];
    character.sprite.verticalFrameIndex = character.frames.up.vertical[0];
    break;
    case 'down':
    character.sprite.horizontalFrameIndex = character.frames.down.horizontal[0];
    character.sprite.verticalFrameIndex = character.frames.down.vertical[0];
    break;
    case 'left':
    character.sprite.horizontalFrameIndex = character.frames.left.horizontal[0];
    character.sprite.verticalFrameIndex = character.frames.left.vertical[0];
    break;
    case 'right':
    character.sprite.horizontalFrameIndex = character.frames.right.horizontal[0];
    character.sprite.verticalFrameIndex = character.frames.right.vertical[0];
    break;
    default:
    break;
    }
    }
   }