
def pagination(PAGE_SIZE, page, objects):
    # Get objects depending on page
    if page != 1:
        num_of_starting_object = PAGE_SIZE * (page - 1)
        num_of_ending_object = num_of_starting_object + PAGE_SIZE
        objects = objects[num_of_starting_object:num_of_ending_object]
        
    # Get first objects of page size
    else:
        objects = objects[:PAGE_SIZE]

    return objects