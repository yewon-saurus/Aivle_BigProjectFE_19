import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Button} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";

function RankPage() {
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList({
    async load({signal, cursor}) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || "http://127.0.0.1:8000/rank/", {signal});
      let json = await res.json();
      console.log(json);

      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: json,
        cursor: json.next,
      };
    },
  });

  const hasMore = page < 9;
  return (
    <div style={{padding:'63px'}}>
        <Table
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                  {list.isLoading && <Spinner color="white" size="sm" />}
                  더 보기
                </Button>
              </div>
            ) : null
          }
          classNames={{
            base: "max-h-[666px] overflow-scroll",
            table: "min-h-[666px]",
          }}
        >
        <TableHeader>
          <TableColumn style={{paddingLeft:'92px'}} key="rank">순위</TableColumn>
          <TableColumn style={{paddingLeft:'88px'}} key="user">아이디</TableColumn>
          <TableColumn style={{paddingLeft:'92px'}} key="user_level">레벨</TableColumn>
          <TableColumn style={{paddingLeft:'145px'}} key="created_dt">클리어 시간</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items.map((item, index) => ({...item, rank: index + 1}))}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item, index) => (
            <TableRow key={item.user}>
              {(columnKey, cellIndex) => 
                <TableCell style={{paddingLeft:'100px'}}>
                  {columnKey === 'rank' ? (item.rank <= 3 ? '👑' : getKeyValue(item, columnKey)) : columnKey === 'created_dt' ? new Date(getKeyValue(item, columnKey)).toLocaleString() : getKeyValue(item, columnKey)}
                </TableCell>}
            </TableRow>
          )}
          </TableBody>
        </Table>
    </div>
  )
}

export default RankPage