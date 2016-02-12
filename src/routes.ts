/**
 * Created by epotignano on 11/02/16.
 */
import * as vizRoutes from './viz/viz.routes';
export class Route {
  path: string;
}
var _routes : Route[] = [];

export = _routes.concat(
  vizRoutes
)
