import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineAutoAwesome } from "react-icons/md";
import Button from "../reusable/Button";

const DemoWidget = () => {
  return (
    <div className="w-full max-w-md bg-(--main-tertiary) border border-(--main-tertiary-light)/50 rounded-2xl p-6 shadow-2xl shadow-(--main-secondary-light)">
      <div className="flex items-center gap-2 mb-6">
        <MdOutlineAutoAwesome className="text-(--main-primary-light) text-2xl" />
        <h3 className="text-xl font-bold text-(--text-primary-light)">
          Generate Quiz
        </h3>
      </div>
      <p className="text-sm text-(--text-secondary) mb-6">
        Upload your materials and get a custom quiz instantly.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-(--main-secondary) rounded-xl mb-6 border border-(--main-tertiary-light)">
        <button className="flex-1 py-2 text-sm font-medium rounded-lg bg-(--main-tertiary-light) text-(--text-primary) shadow-sm">
          Upload PDF
        </button>
        <button className="flex-1 py-2 text-sm font-medium rounded-lg text-(--text-secondary) hover:text-(--text-primary) transition-colors">
          Audio File
        </button>
        <button className="flex-1 py-2 text-sm font-medium rounded-lg text-(--text-secondary) hover:text-(--text-primary) transition-colors">
          Paste Text
        </button>
      </div>

      {/* Upload Area */}
      <div className="flex flex-col items-center justify-center py-10 px-6 bg-(--main-secondary)/50 border-2 border-dashed border-(--main-tertiary-light) rounded-xl mb-6 cursor-pointer hover:border-(--main-primary-light)/50 transition-colors">
        <FiUploadCloud className="text-3xl text-(--main-primary-lighter) mb-3" />
        <p className="text-sm font-medium text-(--text-primary-light) mb-1">
          Drag & drop your PDF here
        </p>
        <p className="text-xs text-(--main-primary-light) mb-2">
          or click to browse
        </p>
        <p className="text-[10px] text-(--text-secondary-light)">
          Supports PDF up to 50MB
        </p>
      </div>

      {/* Settings */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-(--text-secondary) mb-3 uppercase tracking-wider">
          Quiz Settings
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-(--text-secondary-light)">Number of Questions</label>
            <select className="bg-(--main-secondary) border border-(--main-tertiary-light) text-(--text-primary-light) text-xs rounded-md p-2 outline-none">
              <option>20</option>
              <option>10</option>
              <option>30</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-(--text-secondary-light)">Difficulty</label>
            <select className="bg-(--main-secondary) border border-(--main-tertiary-light) text-(--text-primary-light) text-xs rounded-md p-2 outline-none">
              <option>Medium</option>
              <option>Easy</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-(--text-secondary-light)">Question Types</label>
            <select className="bg-(--main-secondary) border border-(--main-tertiary-light) text-(--text-primary-light) text-xs rounded-md p-2 outline-none">
              <option>Mixed</option>
              <option>MCQ</option>
              <option>Theory</option>
            </select>
          </div>
        </div>
      </div>

      <Button width="w-full" color="primary" className="py-3 shadow-lg shadow-(--main-primary)/20">
        Generate Quiz <MdOutlineAutoAwesome className="ml-2" />
      </Button>
    </div>
  );
};

export default DemoWidget;