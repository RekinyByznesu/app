import { useContext, useEffect, useState } from "react";
import { JWTContext } from "../App";

interface Statistic {
  tagType: string;
  stats: { tag: string; score: number }[];
}

export function useStatistics(): [Statistic, (tagType: string) => void] {
  const { JWT } = useContext(JWTContext);
  const [statistics, setStatistics] = useState<Statistic>({
    tagType: "none",
    stats: [{ tag: "mock", score: 0 }],
  });

  const fetchStatistics = (tagType: string) => {
    if (statistics && statistics.tagType === tagType) {
      return;
    }
    fetch(`http://91.206.245.239:5000/api/v1/statistics?tagType=${tagType}`, {
      headers: {
        Authorization: "Bearer " + JWT,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatistics({
          tagType,
          stats: data.map((stat: any) => ({
            tag: stat.tag.name,
            score: stat.score,
          })),
        });
      });
  };

  return [statistics, fetchStatistics];
}

// export function useStatistics2(): [{ score: number }[], (date: Date) => void] {
//   const { JWT } = useContext(JWTContext);
//   const [statistics, setStatistics] = useState<{ score: number }[]>([]);

//   const fetchStatistics = async (date: Date) => {
//     const timestamps = [0, -1, -2, -3, -4, -5, -6].map((offset) => {
//       return offset * 86400000 + date.getTime();
//     });
//     setStatistics(
//       await Promise.all(
//         timestamps.map((timestamp) =>
//           fetch(
//             `http://91.206.245.239:5000/api/v1/statistics/day?date=${timestamp}`,
//             {
//               headers: {
//                 Authorization: "Bearer " + JWT,
//               },
//             }
//           )
//             .then((res) => res.json())
//             .then((data) => {
//               if (data.score) {
//                 return data.score;
//               } else {
//                 return 0;
//               }
//             })
//         )
//       )
//     );
//   };

//   return [statistics, fetchStatistics];
// }
