import { Button, ButtonGroup } from "@blueprintjs/core";
import { PagingViewProps } from "./paging-view.props";

export function PagingView(props: PagingViewProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <ButtonGroup className="paging-view">
      {
        props.currentPageNumber > 0 &&
        (
          <Button
            size="small"
            variant="minimal"
            alignText="center"
            onClick={() => props.currentPageChanged(props.currentPageNumber - 1)}
          >
            Previous Page
          </Button>
        )
      }
      {
        props.hasMore &&
        (
          <Button
            size="small"
            variant="minimal"
            alignText="center"
            onClick={() => props.currentPageChanged(props.currentPageNumber + 1)}
          >
            Next Page
          </Button>
        )
      }
      {renderPageSizeButton(props.currentPageSize, 50)}
      {renderPageSizeButton(props.currentPageSize, 100)}
      {renderPageSizeButton(props.currentPageSize, 200)}
    </ButtonGroup>
  );

  function renderPageSizeButton(currentPageSize: number, pageSize: number) {
    return (
      <Button
        intent={currentPageSize == pageSize ? "primary" : "none"}
        size="small"
        variant="minimal"
        alignText="center"
        disabled={currentPageSize == pageSize}
        onClick={() => props.currentPageSizeChanged(pageSize)}
      >
        {pageSize}
      </Button>
    );
  }
  // #endregion
}
