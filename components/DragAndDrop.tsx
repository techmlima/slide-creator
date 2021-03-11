import { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MusicTableProps } from "./MusicTable";

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
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: '5px',

  background: isDragging ? "grey" : "lightgrey",
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): object => ({
  background: isDraggingOver ? "lightblue" : "#eee",
  padding: grid,
  margin: "3px",
  width: 300,
  borderRadius: '15px',
});

interface State {
  list?: object;
  textsSource: MusicTableProps[];
  changeOrderList;
}

class DragAndDrop extends Component<State> {
  //TODO: Falta melhorar muito esse código
  state: State = {
    list: this.props?.textsSource?.map((item => (
      {
        id: String(item.id),
        content: item.title,
        color: "lightgrey"
      }
    )))
    , textsSource: []
    , changeOrderList: this.props.changeOrderList
  };


  droppableIds = { droppable1: "list" };
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
        copiedState.list = items;
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
        list: result.droppable1 ? result.droppable1 : this.state.list
      });
    }

    setTimeout(() => {
      this.state.changeOrderList(this.state.list)
    })
  };

  render() {
    const listContainer =
    {
      droppableId: "droppable1",
      listId: "list",
      title: "Defina a ordem"
    };

    return (
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable key="list-droppable" droppableId={listContainer.droppableId} >
            {(provided: any, snapshot: any) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <h4 className="text-center">{listContainer.title}</h4>
                {this.state[listContainer.listId] && this.state[listContainer.listId].map((item: any, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} >
                    {(provided: any, snapshot: any) => (
                      <div ref={provided.innerRef}
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
        </DragDropContext>
      </div>
    );
  }
}
export default DragAndDrop