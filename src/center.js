import constant from "./constant.js";

export default function (x, y) {
  var nodes, strength = 1, multiplier = constant(1.0);

  if (x == null) x = 0;
  if (y == null) y = 0;

  function force(alpha) {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0,
        m = Math.min(1.0, Math.max(0.0, multiplier(alpha)));

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }

    for (sx = (sx / n - x) * strength * m, sy = (sy / n - y) * strength * m, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.multiplier = function(_) {
    return arguments.length ? (multiplier = typeof _ === "function" ? _ : constant(+_), force) : multiplier;
  };

  return force;
}
