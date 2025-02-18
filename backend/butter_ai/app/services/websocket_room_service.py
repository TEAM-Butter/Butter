room_motions = {}
'''
방 번호별 member 객체
member: nickname, avatarType으로 구성
'''
room_members = {}

def increase_motion_count(room_id, motion):
    if room_id not in room_motions:
        room_motions[room_id] = {}
    if motion not in room_motions[room_id]:
        room_motions[room_id][motion] = 0
    room_motions[room_id][motion] += 1
    return room_motions[room_id]


def put_member(room_id, member):
    if room_id not in room_members:
        room_members[room_id] = []
    if member not in room_members[room_id]:
        room_members[room_id].append(member)
    return room_members[room_id]


def remove_member(room_id, member):
    if room_id not in room_members:
        return
    if member in room_members[room_id]:
        room_members[room_id].remove(member)


def remove_room(room_id):
    if room_id in room_motions:
        del room_motions[room_id]
    if room_id in room_members:
        del room_members[room_id]
