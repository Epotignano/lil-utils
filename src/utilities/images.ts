/**
 * Created by epotignano on 12/02/16.
 */
import { format } from 'util';
import { lookup } from 'mime';
import { readFileSync } from 'fs';

class Images {
  public static base64Image(imagePath) {
    var _data = readFileSync(imagePath).toString('base64');
    return format('data:%s;base64,%s', lookup(imagePath), _data);
  }
}

export = Images;
