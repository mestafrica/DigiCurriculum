import React from "react";

const Tools = () => {
  return (
    <div className="min-h-[calc(100vh-54px-52px)] rounded-tl-lg bg-white">
      <div className="mx-2 flex flex-col gap-4 rounded-lg px-4 md:ml-0 ml-8 py-5 sm:px-6">
        <div className="flex w-full flex-col items-center justify-center space-y-8 py-10">
          <div className="w-full max-w-[845px]">
            <div className="mb-9 flex flex-row">
              <h1 className="font-quicksand text-4xl font-semibold text-azulRealEscuro">
                Hello, Sika Danquah!
              </h1>
            </div>
            <div className="relative">
              <div className="relative flex h-16 w-full items-center justify-between rounded-full border border-amarelo bg-white px-2 shadow-md">
                <div className="relative flex items-center w-full">
                  <div className="relative flex items-center w-full rounded-lg border-0 px-4 font-quicksand text-sm font-semibold text-azulRealEscuro sm:text-base md:text-lg">
                    <span
                      className="sr-only"
                      aria-live="polite"
                      aria-atomic="false"
                      aria-relevant="additions text"
                      role="log"
                    />
                    <div className="relative w-full overflow-hidden inline-flex justify-center align-middle">
                      <span className="relative block h-6">
                        How can I assist you today?
                      </span>
                    </div>
                    <input
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      id="react-select-5-input"
                      spellCheck="false"
                      tabIndex={0}
                      type="text"
                      aria-autocomplete="list"
                      aria-expanded="false"
                      aria-haspopup="true"
                      role="combobox"
                      aria-activedescendant=""
                      aria-describedby="react-select-5-placeholder"
                      className="w-full bg-transparent outline-none"
                      style={{ padding: "0.5rem" }} // Adjust padding for better alignment
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center"
                >
                  <img
                    src=">"
                    className="h-6"
                    alt="send"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-2 space-y-2 xl:-mx-2 xl:grid xl:grid-cols-2 xl:gap-3 xl:space-y-0 xl:px-2">
          <button
            type="button"
            className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
            fdprocessedid="h4csb"
          >
            <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
              <img
                src=""
                alt="Study Plan"
                className="flex w-full max-w-10 items-center justify-center sm:size-full"
              />
            </div>
            <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
              <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
                Study Plan
              </div>
            </div>
          </button>
          <button
            type="button"
            className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
            fdprocessedid="md25pb"
          >
            <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
              <img
                src=""
                alt="Grammar Checker"
                className="flex w-full max-w-10 items-center justify-center sm:size-full"
              />
            </div>
            <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
              <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
                Grammar Checker
              </div>
            </div>
          </button>
          <button
            type="button"
            className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
            fdprocessedid="1s8vbc"
          >
            <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
              <img
                src=""
                alt="Text Summarizer"
                className="flex w-full max-w-10 items-center justify-center sm:size-full"
              />
            </div>
            <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
              <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
                Text Summarizer
              </div>
            </div>
          </button>
          <button
            type="button"
            className="mx-2 flex h-fit w-full flex-row rounded-lg border border-[#d5e1ed] p-4 transition-colors duration-100 hover:bg-[#eff5fb] sm:items-center sm:justify-center md:p-4 lg:h-24"
            fdprocessedid="e4liac"
          >
            <div className="mr-4 flex w-[30%] items-center justify-center sm:w-[10%]">
              <img
                src=""
                alt="Common Mistakes"
                className="flex w-full max-w-10 items-center justify-center sm:size-full"
              />
            </div>
            <div className="flex h-full w-[70%] flex-col justify-center text-left leading-5 sm:w-[90%]">
              <div className="font-quicksand text-sm font-bold text-[#313d47] sm:text-base lg:line-clamp-1">
                Common Mistakes
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tools;
