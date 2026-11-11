import { useEffect, useRef } from 'react'
import { HEARTH_FRAGMENT_SHADER, HEARTH_VERTEX_SHADER } from './hearthShaderSource'

interface HearthShaderProps {
  className?: string
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/**
 * Ambient WebGL glow behind the hero.
 * Pauses off-screen; draws a single still frame under prefers-reduced-motion.
 * Without WebGL the canvas stays empty and the section's own background shows.
 */
export function HearthShader({ className }: HearthShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl')
    if (!canvas || !gl) return

    const vertex = compile(gl, gl.VERTEX_SHADER, HEARTH_VERTEX_SHADER)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, HEARTH_FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!vertex || !fragment || !program) return

    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uResolution = gl.getUniformLocation(program, 'u_resolution')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let lastTime = 0

    const syncSize = () => {
      const width = canvas.clientWidth || 1280
      const height = canvas.clientHeight || 720
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const draw = (time: number) => {
      lastTime = time
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uTime, time * 0.001)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const loop = (time: number) => {
      draw(time)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const resizeObserver = new ResizeObserver(() => {
      syncSize()
      if (!frame) draw(lastTime)
    })
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return
      if (entry.isIntersecting) start()
      else stop()
    })
    visibilityObserver.observe(canvas)

    syncSize()
    draw(0)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
