import { useState, useEffect } from "react";
import { useRecordApiCall } from "../../api/axios/useRecordApiCall";
import { JOB_MAP } from "../../constants/common/JobMap";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { registerables, Chart as ChartJS, CategoryScale } from "chart.js";

ChartJS.register(CategoryScale, ...registerables);

type winRate = number;
interface UserGameStat {
  totalWinRate: winRate;
  [jobId: string]: winRate;
}

export const ProfileData = () => {
  const { getTotalWinRate, getJobWinRate } = useRecordApiCall();
  const [userGameStat, setUserGameStat] = useState<UserGameStat>({
    totalWinRate: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  useEffect(() => {
    (async () => {
      const totalWinRate = await getTotalWinRate();
      const jobWinRate = await getJobWinRate();
      setUserGameStat({ totalWinRate, ...jobWinRate });
    })();
  }, []);

  const jobNames: string[] = [];
  const winRates: number[] = [];

  Object.entries(userGameStat).forEach(([jobId, winRate]) => {
    if (jobId === "totalWinRate") return;

    const jobName = JOB_MAP.find((job) => job.id === jobId)?.name || "Job not found";
    jobNames.push(jobName);
    winRates.push(winRate);
  });

  const colors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(99, 255, 132, 0.6)",
  ];

  const borderColors = colors.map((color) => color.replace("0.6", "1"));
  const data = {
    labels: jobNames,
    datasets: [
      {
        label: "",
        data: winRates,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    animation: {
      duration: 1000,
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 30, // x축 레이블의 글자 크기 설정
            weight: "bold", // x축 레이블의 굵기 설정
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 30, // y축 레이블의 글자 크기 설정
            weight: "bold",
          },
          stepSize: 20, // y축 틱 간격 설정 (예: 10, 20, 30, ...)
        },
        min: 0, // y축 최소 값 (선택 사항)
        max: 100, // y축 최대 값 (선택 사항)
      },
    },
    plugins: {
      legend: {
        display: false, // 레전드를 숨김
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="3xl:p-[20px] p-[16px] font-bold text-white h-full"
    >
      <div className="flex flex-col justify-between h-full 3xl:text-[40px] text-[32px] 3xl:px-[56px] px-[44.8px] 3xl:py-[24px] py-[19.2px]">
        <p className="3xl:mb-[16px] mb-[20px]">총 승률 : {userGameStat.totalWinRate}%</p>
        <div>
          <Bar data={data} options={options} />
          <p className="3xl:mb-[10px] mb-[8px] text-center">역할 별 승률</p>
        </div>
      </div>
    </motion.div>
  );
};
