import sys
import os


def create_selection():
    path = sys.path[0]
    selection = []
    for i in os.walk(path):
        for fileName in i[2:3][0]:
            filePath = os.path.join(i[0], fileName)
            if fileName.endswith(".py"):
                selection.append(fileName)
    return selection

def create_selection_file(selection):
    filePath = os.path.join(sys.path[0], 'all_scripts_selection.txt')
    theFile = open(filePath, 'w')
    for scriptPath in selection:
        theFile.write(scriptPath+'\n')
    theFile.close()


if __name__ == '__main__':
    selection = create_selection()
    create_selection_file(selection)