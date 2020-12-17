import itertools

f = open("inputs/17.txt", "r")

grid = {}
for i, line in enumerate(f):
    for j, val in enumerate(line.rstrip()):
        grid[(i, j, 0, 0)] = val == '#'

for i in range(6):
    nextGrid = {}
    for x in range(min(val[0] for val in grid) - 1, max(val[0] for val in grid) + 2):
        for y in range(min(val[1] for val in grid) - 1, max(val[1] for val in grid) + 2):
            for z in range(min(val[2] for val in grid) - 1, max(val[2] for val in grid) + 2):
                for t in range(min(val[3] for val in grid) - 1, max(val[3] for val in grid) + 2):
                    count = 0
                    # stole Ryan Norris' insanely clean version of iterating over dimensions
                    for dx, dy, dz, dt in itertools.product([-1, 0, 1], [-1, 0, 1], [-1, 0, 1], [-1, 0, 1]):
                        if dx == dy == dz == dt == 0:
                            continue
                        if grid.get((x + dx, y + dy, z + dz, t + dt), False):
                            count += 1

                    if (grid.get((x,y,z,t), False) and (count == 2 or count == 3)) or (not grid.get((x,y,z,t), False) and count == 3):
                        nextGrid[(x, y, z, t)] = True
    grid = nextGrid

res = 0
for val in grid:
    res += 1 if val else 0
print(res)