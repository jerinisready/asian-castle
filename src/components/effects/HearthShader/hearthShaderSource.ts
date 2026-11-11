/* GLSL from the approved Stitch design (stitch/code.html, ANIMATION_12). */

export const HEARTH_VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

/** Procedural lantern and steam glow: burgundy-to-espresso field with drifting brass lights. */
export const HEARTH_FRAGMENT_SHADER = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.4;

  vec3 colorBurgundy = vec3(0.18, 0.04, 0.07);
  vec3 colorGold = vec3(0.71, 0.53, 0.25);
  vec3 colorHearth = vec3(0.95, 0.65, 0.28);
  vec3 colorDark = vec3(0.08, 0.07, 0.06);

  float d1 = length(p - vec2(-0.4, 0.2 + sin(t * 0.7) * 0.05));
  float d2 = length(p - vec2(0.5, -0.1 + cos(t * 0.5) * 0.06));
  float d3 = length(p - vec2(0.0, -0.4 + sin(t * 0.9) * 0.03));

  float glow1 = 0.08 / (d1 * d1 + 0.12);
  float glow2 = 0.06 / (d2 * d2 + 0.15);
  float glow3 = 0.05 / (d3 * d3 + 0.18);

  float wave = sin(p.y * 3.0 + t + sin(p.x * 2.5 + t * 0.8)) * 0.5 + 0.5;
  wave *= sin(p.x * 4.0 - t * 0.6) * 0.5 + 0.5;

  vec3 finalColor = mix(colorDark, colorBurgundy, uv.y * 0.8);
  finalColor += colorHearth * (glow1 * 0.45);
  finalColor += colorGold * (glow2 * 0.35 + glow3 * 0.25);
  finalColor += vec3(0.3, 0.15, 0.08) * wave * 0.12;

  float vig = 1.0 - length(uv - 0.5) * 0.9;
  finalColor *= clamp(vig, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, 0.85);
}`
