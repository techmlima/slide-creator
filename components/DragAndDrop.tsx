import { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TextSourceProps } from "./TextSource";

// a little function to help us with reordering the result
const reorder = (list: [], startIndex: number, endIndex: number): object => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
): {} => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  let result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 4;

const getItemStyle = (isDragging: boolean, draggableStyle: any): object => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "lightgrey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): object => ({
  background: isDraggingOver ? "lightblue" : "#eee",
  padding: grid,
  margin: "3px",
  width: 250
});

interface State {
  list1: object;
}

class DragAndDrop extends Component<State> {
  state: State = { list1: [] };

  constructor(props){
    super(props) 
    this.state.list1 = props.textSource.map((item =>(
      {
        id: String(item.id),
        content: item.title,
        color:"lightgreen"
      }
    )))
  }

  droppableIds = { droppable1: "list1" };
  getList = (id: string): any => this.state[this.droppableIds[id]];

  onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items: object = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let copiedState: any = Object.assign({}, this.state);

      if (source.droppableId === "droppable1") {
        copiedState.list1 = items;
      } 
      this.setState(copiedState);
    } else {
      const result: any = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        list1: result.droppable1 ? result.droppable1 : this.state.list1
      });
    }
  };

  render() {
    const lists = [
      {
        droppableId: "droppable1",
        listId: "list1",
        title: "Defina a ordem"
      }];

    return (
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {lists.map((list, listIndex) => (
            <Droppable
              key={"list-droppable-" + listIndex}
              droppableId={list.droppableId}
            >
              {(provided: any, snapshot: any) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <h4>{list.title}</h4>
                  {this.state[list.listId] &&
                    this.state[list.listId].map((item: any, index: number) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div style={{ background: item.color }}>
                              {item.content}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    );
  }
}
export default DragAndDrop