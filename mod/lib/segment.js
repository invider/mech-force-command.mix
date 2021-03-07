const quadrant = {
    center: 0,
    south: 8,
    north: 4,
    east: 2,
    west: 1,
    'north-west': 5,
    'north-east': 6,
    'south-west': 9,
    'south-east': 10,
}

function positionSegment(segment, quadName, target) {
    const quad = quadrant[quadName]
    if (!quad) return

    switch(quad) {
    case quadrant.north:
            segment.x = target.x
            segment.y = target.y - segment.h
            break;

    case quadrant.south:
            segment.x = target.x
            segment.y = target.y + target.h
            break;

    case quadrant.east:
            segment.x = target.x + target.w
            segment.y = target.y
            break;

    case quadrant.west:
            segment.x = target.x - segment.w
            segment.y = target.y
            break;

    case quadrant['north-west']:
            segment.x = target.x - segment.w
            segment.y = target.y - segment.h
            break;

    case quadrant['north-east']:
            segment.x = target.x + segment.w
            segment.y = target.y - segment.h
            break;

    case quadrant['south-west']:
            segment.x = target.x - segment.w
            segment.y = target.y + segment.h
            break;

    case quadrant['south-east']:
            segment.x = target.x + segment.w
            segment.y = target.y + segment.h
            break;
    }

    const curSegment = target.root().getSegment(segment.x, segment.y)
    if (curSegment) {
        positionSegment(segment, quadName, curSegment)
    }
}
