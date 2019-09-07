export function rectCircleColliding(cx: number, cy: number, cr: number, rx: number, ry: number, rw: number, rh: number) {
  const distX = Math.abs(cx - rx - rw / 2)
  const distY = Math.abs(cy - ry - rh / 2)
  if (distX > (rw / 2 + cr)) {
    return false
  }
  if (distY > (rh / 2 + cr)) {
    return false
  }
  if (distX <= (rw / 2)) {
    return true
  }
  if (distY <= (rh / 2)) {
    return true
  }
  const dx = distX - rw / 2
  const dy = distY - rh / 2
  return (dx * dx + dy * dy <= (cr * cr))
}
