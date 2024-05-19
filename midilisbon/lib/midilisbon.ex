defmodule Midilisbon do
  @temperatura_minima "data/535-annual-hist-obs-tasmin.csv"
  @temperatura_maxima "data/535-annual-hist-obs-tasmax.csv"
  @temperatura_media "data/535-annual-hist-obs-tasavg.csv"

  def play_music do
    out_port = Midiex.ports(:output)|> List.first()
    out_conn = Midiex.open(out_port)

    data_min = for [year_str, value_str] <- read_data(@temperatura_minima) |> Enum.drop(1), do: [String.to_integer(year_str), String.to_float(value_str)]
    data_max = for [year_str, value_str] <- read_data(@temperatura_maxima) |> Enum.drop(1), do: [String.to_integer(year_str), String.to_float(value_str)]
    data_avg = for [year_str, value_str] <- read_data(@temperatura_media) |> Enum.drop(1), do: [String.to_integer(year_str), String.to_float(value_str)]

    notes = Enum.map(data_min ++ data_max ++ data_avg, fn [_, value] -> value end) |> normalize |> convert_notes
    [data_min, data_max, data_avg] = Enum.chunk_every(notes, div(Enum.count(notes), 3))

    data_max |> Enum.each(fn note ->
      IO.inspect(note, label: "Debug")
      play_note(note, out_conn)
    end)
  end

  defp play_note(note, out_conn) do
    Midiex.send_msg(out_conn, <<0x90, note, 127>>)
    :timer.sleep(2000)
    Midiex.send_msg(out_conn, <<0x80, note, 127>>)
  end

  defp read_data(file) do
    data = File.read!(file)
    lines = String.split(data, "\n")

    Enum.map(lines, fn line ->
      String.split(line, ",") |> Enum.map(&String.trim/1)
    end)
  end
  defp normalize(data) do
    {min, max} = Enum.min_max(data)
    {new_min, new_max} = {0, 1}
    Enum.map(data,
    & new_min+((&1-min)/(max-min)*(new_max-new_min)))
  end

  defp convert_notes(data) do
    #lydian_scale = [24, 36, 43, 48, 52, 55, 57, 59, 62, 64, 67, 69, 71, 74, 76, 79, 81, 83, 86, 88, 90, 91, 93]
    major_scale = [24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62]
    pentatonic = [24, 26, 28, 31, 33, 36, 38, 40, 43, 45, 48, 50, 52, 55, 57, 60, 62, 64, 67, 69, 72, 74, 76]
    Enum.map(data, fn value ->
      index = round(value*(length(pentatonic)-1))
      Enum.at(pentatonic, index)
    end)
  end

end

Midilisbon.play_music()
