import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({ queryData2 }: any) {
  // console.log(queryData2[0].nom);

  return (
    <div className="space-y-8">
      {queryData2 &&
        queryData2.slice(0, 5).map((el: any) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="uppercase">
                {el.nom.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{el.nom}</p>
              <p className="text-sm text-muted-foreground">{el.service}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
