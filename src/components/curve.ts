interface Options {
  startElm: HTMLElement
  endElm: HTMLElement
  padding?: number
}

export interface Point {
  x: number
  y: number
}

export interface Offset {
  x?: number
  y?: number
}

export interface FormatedOffset {
  x: number,
  y: number
}

export interface PointOptions {
  // p0
  startPlacement: Placement
  startOffset?: Offset
  // p
  endPlacement: Placement
  endOffset?: Offset
  // p1
  ctl1Offset?: Offset
  // p2
  ctl2Offset?: Offset
}

type Placement =
  | 'top-start'
  | 'top-mid'
  | 'top-end'
  | 'left-start'
  | 'left-mid'
  | 'left-end'
  | 'bottom-start'
  | 'bottom-mid'
  | 'bottom-end'
  | 'right-start'
  | 'right-mid'
  | 'right-end'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export class Curve {
  container: Rect
  // p0
  startPosition: Position
  // p
  endPosition: Position

  constructor(options: Options) {
    options.padding = options.padding ?? 20
    const { startElm, endElm, padding } = options
    this.container = new Rect(startElm, endElm, padding)
    this.startPosition = new Position(startElm, this.container)
    this.endPosition = new Position(endElm, this.container)
  }

  getPoints(options: PointOptions) {
    options.ctl1Offset = formatOffset(options.ctl1Offset);
    options.ctl2Offset = formatOffset(options.ctl2Offset);
    options.startOffset = formatOffset(options.startOffset);
    options.endOffset = formatOffset(options.endOffset);
    const p0 = this.startPosition.getPoint(options.startPlacement, options.startOffset)
    const p = this.endPosition.getPoint(options.endPlacement, options.endOffset)
    const width = p.x - p0.x
    const height = p.y - p0.y
    const p1: Point = {
      x: p0.x + width / 3 + options.ctl1Offset.x,
      y: p0.y + height / 3 + options.ctl1Offset.y
    }
    const p2: Point = {
      x: p0.x + (width / 3) * 2 + options.ctl2Offset.x,
      y: p0.y + (height / 3) * 2 + options.ctl2Offset.y
    }
    return {
      p0,
      p1,
      p2,
      p
    }
  }
}

export class Position {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
  points: Record<Placement, Point>
  constructor(elm: HTMLElement, containRect: Rect) {
    const boundingRect = elm.getBoundingClientRect()
    this.width = boundingRect.width
    this.height = boundingRect.height
    this.left = boundingRect.left - containRect.left
    this.top = boundingRect.top - containRect.top
    this.right = boundingRect.right - containRect.left
    this.bottom = boundingRect.bottom - containRect.top
    this.points = {} as Record<Placement, Point>
    this.setPoints()
  }

  getPoint(placement: Placement, offset = { x: 0, y: 0 }): Point {
    const point = this.points[placement]
    return {
      x: point.x + offset.x,
      y: point.y + offset.y
    }
  }

  setPoints() {
    const dimension = ['start', 'mid', 'end']
    const xDirection = ['right', 'left'] as const
    const yDirection = ['top', 'bottom'] as const
    yDirection.forEach((ydir) => {
      xDirection.forEach((xdir) => {
        const name = `${ydir}-${xdir}` as Placement
        this.points[name] = { x: this[xdir], y: this[ydir] }
      })
    })

    xDirection.forEach((xdir) => {
      dimension.forEach((dim, i) => {
        const name = `${xdir}-${dim}` as Placement
        const interval = this.height / 4
        this.points[name] = {
          x: this[xdir],
          y: this.top + (i + 1) * interval
        }
      })
    })

    yDirection.forEach((ydir) => {
      dimension.forEach((dim, i) => {
        const name = `${ydir}-${dim}` as Placement
        const interval = this.width / 4
        this.points[name] = {
          x: this.left + (i + 1) * interval,
          y: this[ydir]
        }
      })
    })
  }
}

class Rect {
  top: number
  left: number
  bottom: number
  right: number
  padding: number

  constructor(startElm: HTMLElement, endElm: HTMLElement, padding: number) {
    const startRect = startElm.getBoundingClientRect()
    const endRect = endElm.getBoundingClientRect()
    this.top = Math.min(startRect.top, endRect.top)
    this.left = Math.min(startRect.left, endRect.left)
    this.bottom = Math.max(startRect.bottom, endRect.bottom)
    this.right = Math.max(startRect.right, endRect.right)
    this.padding = padding
    this.setPadding()
  }

  setPadding() {
    this.top = Math.max(this.top - this.padding, 0)
    this.left = Math.max(this.left - this.padding, 0)
    this.bottom = this.bottom + this.padding
    this.right = this.right + this.padding
  }

  get width() {
    return this.right - this.left
  }

  get height() {
    return this.bottom - this.top
  }
}

function formatOffset(offset?: Offset): FormatedOffset {
  return {
    x: offset?.x ?? 0,
    y: offset?.y ?? 0
  }
}
