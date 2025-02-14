room_motions = {}

def increase_motion_count(room_id, motion):
    if room_id not in room_motions:
        room_motions[room_id] = {}
    if motion not in room_motions[room_id]:
        room_motions[room_id][motion] = 0
    room_motions[room_id][motion] += 1
    return room_motions[room_id]


def remove_room(room_id):
    if room_id in room_motions:
        del room_motions[room_id]
