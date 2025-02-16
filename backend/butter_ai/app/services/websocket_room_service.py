room_motions = {}
room_nicknames = {}

def increase_motion_count(room_id, motion):
    if room_id not in room_motions:
        room_motions[room_id] = {}
    if motion not in room_motions[room_id]:
        room_motions[room_id][motion] = 0
    room_motions[room_id][motion] += 1
    return room_motions[room_id]


def put_nickname(room_id, nickname):
    if room_id not in room_nicknames:
        room_nicknames[room_id] = []
    if nickname not in room_nicknames[room_id]:
        room_nicknames[room_id].append(nickname)
    return room_nicknames[room_id]


def remove_room(room_id):
    if room_id in room_motions:
        del room_motions[room_id]
    if room_id in room_nicknames:
        del room_nicknames[room_id]
