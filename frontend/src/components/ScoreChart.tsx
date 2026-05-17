import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

} from "recharts";


type Props = {

  data: {

    score: number;

    created_at: string;

  }[];

};


export default function ScoreChart({
  data,
}: Props) {

  const chartData = data.map((item) => ({

    score: item.score,

    date: new Date(
      item.created_at
    ).toLocaleDateString(),

  }));


  return (

    <div className="bg-white p-6 rounded-2xl border shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Addiction Score Trend
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={chartData}>

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}