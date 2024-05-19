# Instale a biblioteca utilizando o seguinte comando no terminal:
# mix escript.install hex erlaudio

# Execute o script usando o comando:
# mix run nome_do_arquivo.exs

defmodule AnomalySonification do
  alias :erlaudio, as: Audio

  @temperatura_minima "535-annual-hist-obs-tasmin.csv"
  @temperatura_maxima "535-annual-hist-obs-tasmax.csv"
  @temperatura_media "535-annual-hist-obs-tasavg.csv"

  def play_music do
    tempo = 0.2

    data_min = read_data(@temperatura_minima)
    data_max = read_data(@temperatura_maxima)
    data_avg = read_data(@temperatura_media)

    Enum.zip(data_min, data_max, data_avg)
    |> Enum.each(fn {min, max, avg} ->
      play_notes(min, max, avg)
      :timer.sleep(tempo * 1000)  # em milissegundos
    end)
  end

  defp read_data(file) do
    data = File.read!(file)
    lines = String.split(data, "\n")

    Enum.map(lines, fn line ->
      String.split(line, ",") |> Enum.map(&String.trim/1)
    end)
  end

  defp play_notes(min, max, avg) do
    play_note(:piano, min)
    play_note(:tri, max)
    play_note(:saw, avg)
  end

  defp play_note(synth_type, anomaly) do
    freq = anomaly * 10 + 440  # Frequência ajustada conforme a anomalia
    duration = 0.5

    case synth_type do
      :piano -> Audio.play({:sine, freq, duration})
      :tri   -> Audio.play({:triangle, freq, duration})
      :saw   -> Audio.play({:sawtooth, freq, duration})
    end
  end
end

AnomalySonification.play_music()
